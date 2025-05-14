 
import { from } from "rxjs";
import { clientApi } from "./httpClient";
import type { CRFTitle, TitleInfo, CRFTitleMain, RecChanges, CRFParagraph } from "./models";
import { appDelay } from "./lib";
 
class Api_CRFs {
    api_base = 'http://localhost:4000/api/CRF';
    constructor() {
        this.initialize();
    }

    initialize() {

    }
    getTitles = async (): Promise<CRFTitle[]> => {
        await appDelay(500)
        let _url = `${this.api_base}/Get_crf_Titles`
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    }
    getCRFTitleParagraphs = async (_title:string): Promise<CRFParagraph[]> => {
        await appDelay(500)
        let _url = `${this.api_base}/get_crf_TitleParagraphs?title=` + _title
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    }

    get_main_titles = async (): Promise<CRFTitleMain[]> => {
        await appDelay(500)
        let _url = `${this.api_base}/get_crf_mainTitles`  
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    }

    get_recent_Changes = async (title: number): Promise<RecChanges[]> => {
        await appDelay(500)
        if (title == 0) {
            title = 16;
        }
        let _url = `https://www.ecfr.gov/api/versioner/v1/versions/title-${title}.json`;
       // console.log(_url2);
        let _url2 = "https://www.ecfr.gov/api/versioner/v1/versions/title-16.json";
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    }

    async getTitlesInfo(): Promise<TitleInfo[]> {
        let _url = "https://www.ecfr.gov/api/versioner/v1/titles.json";
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    }
}
var api_CRFs = new Api_CRFs();
export { api_CRFs };