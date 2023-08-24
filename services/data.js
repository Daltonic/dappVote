import { faker } from '@faker-js/faker'

export const generateFakePolls = (count) => {
  const fakePolls = []

  for (let i = 0; i < count; i++) {
    const numAvatars = faker.number.int({ min: 1, max: 3 })
    const numVoters = faker.number.int({ min: 1, max: 3 })

    const fakePoll = {
      id: i + 1,
      image: faker.image.avatar(),
      title: faker.lorem.lines(1),
      description: faker.lorem.paragraph(),
      votes: faker.number.int(),
      contestants: faker.number.int(),
      deleted: faker.datatype.boolean(),
      director: faker.finance.ethereumAddress(),
      startsAt: Date.now() - 10 * 60 * 1000,
      endsAt: Date.now() + 10 * 60 * 1000 * 24 * 2,
      timestamp: Date.now(),
      avatars: [...Array(numAvatars).keys()].map((i) => faker.image.avatar()),
      voters: [...Array(numVoters).keys()].map((i) => faker.finance.ethereumAddress()),
    }

    fakePolls.push(fakePoll)
  }

  return fakePolls
}
