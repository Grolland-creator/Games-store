export const getPageCount = (totalCount: number, limit: number) => {
   return Math.ceil(totalCount / limit)
}
