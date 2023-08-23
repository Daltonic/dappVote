const { expect } = require('chai')
const { expectRevert } = require('@openzeppelin/test-helpers')

describe('Contracts', () => {
  let contract, result

  const description = 'Lorem Ipsum'
  const title = 'Republican Primary Election'
  const image = 'https://image.png'
  const starts = Date.now() - 10 * 60 * 1000
  const ends = Date.now() + 10 * 60 * 1000
  const pollId = 1
  const contestantId = 1

  const avater1 = 'https://avatar1.png'
  const name1 = 'Nebu Ballon'
  const avater2 = 'https://avatar2.png'
  const name2 = 'Kad Neza'

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('DappVotes')
    ;[deployer, contestant1, contestant2, voter1, voter2, voter3] = await ethers.getSigners()

    contract = await Contract.deploy()
    await contract.deployed()
  })

  describe('Poll Management', () => {
    describe('Success', () => {
      it('should confirm poll creation success', async () => {
        result = await contract.getPolls()
        expect(result).to.have.lengthOf(0)

        await contract.createPoll(image, title, description, starts, ends)

        result = await contract.getPolls()
        expect(result).to.have.lengthOf(1)

        result = await contract.getPoll(pollId)
        expect(result.title).to.be.equal(title)
        expect(result.director).to.be.equal(deployer.address)
      })

      it('should confirm poll update success', async () => {
        await contract.createPoll(image, title, description, starts, ends)

        result = await contract.getPoll(pollId)
        expect(result.title).to.be.equal(title)

        await contract.updatePoll(pollId, image, 'New Title', description, starts, ends)

        result = await contract.getPoll(pollId)
        expect(result.title).to.be.equal('New Title')
      })

      it('should confirm poll deletion success', async () => {
        await contract.createPoll(image, title, description, starts, ends)

        result = await contract.getPolls()
        expect(result).to.have.lengthOf(1)

        result = await contract.getPoll(pollId)
        expect(result.deleted).to.be.equal(false)

        await contract.deletePoll(pollId)

        result = await contract.getPolls()
        expect(result).to.have.lengthOf(0)

        result = await contract.getPoll(pollId)
        expect(result.deleted).to.be.equal(true)
      })
    })

    describe('Failure', () => {
      it('should confirm poll creation failures', async () => {
        await expectRevert(
          contract.createPoll('', title, description, starts, ends),
          'Image URL cannot be empty'
        )
        await expectRevert(
          contract.createPoll(image, title, description, 0, ends),
          'Start date must be greater than 0'
        )
      })

      it('should confirm poll update failures', async () => {
        await expectRevert(
          contract.updatePoll(100, image, 'New Title', description, starts, ends),
          'Poll not found'
        )
      })

      it('should confirm poll deletion failures', async () => {
        await expectRevert(contract.deletePoll(100), 'Poll not found')
      })
    })
  })

  describe('Poll Contest', () => {
    beforeEach(async () => {
      await contract.createPoll(image, title, description, starts, ends)
    })

    describe('Success', () => {
      it('should confirm contest entry success', async () => {
        result = await contract.getPoll(pollId)
        expect(result.contestants.toNumber()).to.be.equal(0)

        await contract.connect(contestant1).contest(pollId, name1, avater1)
        await contract.connect(contestant2).contest(pollId, name2, avater2)

        result = await contract.getPoll(pollId)
        expect(result.contestants.toNumber()).to.be.equal(2)

        result = await contract.getContestants(pollId)
        expect(result).to.have.lengthOf(2)
      })
    })

    describe('Failure', () => {
      it('should confirm contest entry failure', async () => {
        await expectRevert(contract.contest(100, name1, avater1), 'Poll not found')
        await expectRevert(contract.contest(pollId, '', avater1), 'name cannot be empty')

        await contract.connect(contestant1).contest(pollId, name1, avater1)
        await expectRevert(
          contract.connect(contestant1).contest(pollId, name1, avater1),
          'Already contested'
        )
      })
    })
  })

  describe('Poll Voting', () => {
    beforeEach(async () => {
      await contract.createPoll(image, title, description, starts, ends)
      await contract.connect(contestant1).contest(pollId, name1, avater1)
      await contract.connect(contestant2).contest(pollId, name2, avater2)
    })

    describe('Success', () => {
      it('should confirm contest entry success', async () => {
        result = await contract.getPoll(pollId)
        expect(result.votes.toNumber()).to.be.equal(0)

        await contract.connect(contestant1).vote(pollId, contestantId)
        await contract.connect(contestant2).vote(pollId, contestantId)

        result = await contract.getPoll(pollId)
        expect(result.votes.toNumber()).to.be.equal(2)
        expect(result.voters).to.have.lengthOf(2)
        expect(result.avatars).to.have.lengthOf(2)

        result = await contract.getContestants(pollId)
        expect(result).to.have.lengthOf(2)

        result = await contract.getContestant(pollId, contestantId)
        expect(result.voters).to.have.lengthOf(2)
        expect(result.voter).to.be.equal(contestant1.address)
      })
    })

    describe('Failure', () => {
      it('should confirm contest entry failure', async () => {
        await expectRevert(contract.vote(100, contestantId), 'Poll not found')
        await contract.deletePoll(pollId)
        await expectRevert(contract.vote(pollId, contestantId), 'Polling not available')
      })
    })
  })
})
