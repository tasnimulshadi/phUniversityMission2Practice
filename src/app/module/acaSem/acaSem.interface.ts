// acaSem = academySemester = Academy Semester

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcaSem = {
  name: 'spring' | 'summer' | 'fall'
  year: Date
  code: '01' | '02' | '03'
  startMonth: Month
  endMonth: Month
}
