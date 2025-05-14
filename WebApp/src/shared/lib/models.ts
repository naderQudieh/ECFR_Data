export interface CRFTitle {
    node: string
    title_Ref: number
    head: string
    amendmentDate: string
}

export interface RecChanges {
    title: string
    type: string
    date: string
    amendment_date: string
    issue_date: string
    identifier: string
    name: string 
    removed: boolean 
}
export interface CRFTitleMain {
    node: string
    title: string 
    no_of_paragraphs: number
    no_of_parts: number
    no_of_words: number
    no_of_sections: number
}
export interface CRFParagraph {
    title: string,
    paragraphID: number
    sectionNode: string
    paragraphText: string 
}


 