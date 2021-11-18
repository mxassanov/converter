import axios from 'axios';
import { action, observable, computed } from 'mobx';
import { TCurrenciesObj } from '../types';

export default class storeOfCurrencies {
    @observable private currencies: TCurrenciesObj = {};
    @observable private countries: string[] = ['RUB'];

    @computed get getCurrencies(): TCurrenciesObj {
        return this.currencies;
    }

    @computed get getCountries(): string[] {
        return this.countries;
    }

    @action.bound async fetchCurrencies(): Promise<void> {
        try {
            const res = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');

            this.currencies = res.data.Valute;

            for (const code in res.data.Valute) {
                this.countries.push(code);
            }
        } catch (e) {
            console.log(e);
        }

    }

}