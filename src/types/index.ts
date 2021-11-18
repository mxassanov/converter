export type TCurrency = {
    CharCode: string,
    ID: string,
    NumCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number
}

export type TCurrenciesObj = { [key: string]: TCurrency };
