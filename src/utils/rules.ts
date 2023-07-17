export const rules = {
   required: (message: string = "Required field") => ({
      required: true,
      message
   }),
   max: (maxLength : number, message: string = `The number of characters cannot be less ${maxLength}`) => ({
      max: maxLength,
      message
   }),
   min: (minLength : number, message: string = `The number of characters cannot be less ${minLength}`) => ({
      min: minLength,
      message
   }),
   type: (typee : Array<string>, message: string = 'Incorrect type of introduced value') => ({
      type: typee,
      message
   })
}