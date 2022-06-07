import { forms } from '../constants'

const typedForms = forms as Forms

export interface Forms {
  animalForm: number
  actualForm: number
}
export { typedForms as forms }
