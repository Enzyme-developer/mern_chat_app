const notfound = (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
    res.status(404).json({ message: 'Page does not Exist' })
}

module.exports = notfound 