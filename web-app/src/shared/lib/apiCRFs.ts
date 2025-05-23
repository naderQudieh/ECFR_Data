 
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
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        return response.json()
    }

    getTitlesInfo = async (): Promise<TitleInfo[]> => {
        let _url = "https://www.ecfr.gov/api/versioner/v1/titles.json";
        const response = await fetch(_url)
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        //console.log(response);
        return response.json()
    }
    getTitleXML = async (
        date: string,
        title: string,
        params?: {
            subtitle?: string
            chapter?: string
            subchapter?: string
            part?: string
            subpart?: string
            section?: string
            appendix?: string
        }

    ): Promise<string> => { 
        let _url = `https://www.ecfr.gov/api/versioner/v1/full/${date}/title-${title}.xml`;
        const url = new URL(_url);
        const _params = new URLSearchParams(params);
        url.search = _params.toString();
        const response = await fetch(_url, { 
            headers: { Accept: 'application/text' },
        })
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }
        console.log(response);
        return response.json()
      
    }
}
var api_CRFs = new Api_CRFs();
export { api_CRFs };