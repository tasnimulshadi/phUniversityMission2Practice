export type TAcademicSemesterMonth =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'

export type TAcademicSemesterName = 'spring' | 'summer' | 'fall'

export type TAcademicSemesterCode = '01' | '02' | '03'

export type TAcademicSemester = {
  name: TAcademicSemesterName
  year: string
  code: TAcademicSemesterCode
  startMonth: TAcademicSemesterMonth
  endMonth: TAcademicSemesterMonth
}

// mappped type
export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string
}
