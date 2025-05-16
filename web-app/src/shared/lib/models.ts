
 
export interface CRFTitle {
    node: string
    title_Ref: number
    head: string
    amendmentDate: string
}
export interface TitleInfo {
    number: number
    name: string
    latest_amended_on: string
    latest_issue_date: string
    up_to_date_as_of: string
    reserved: boolean
    result_count: number
    processing_in_progress?: boolean
}
//export interface TitleInfo {
//    number: number
//    name: string
//    latestAmendedOn: string | null
//    latestIssueDate: string | null
//    upToDateAsOf: string | null
//    reserved: boolean
//    processingInProgress?: boolean
//}
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


 