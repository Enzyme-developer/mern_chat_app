const notfound = (req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any } } }) => {
    res.status(404).send('Page does not Exist')
}

module.exports = notfound 