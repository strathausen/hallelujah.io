interface Args  {q: string, limit?: number, edition: string}

export const query = (args: Args) => {
  console.log(args)
  return [{
    foo: 'bar'
  }]
}
