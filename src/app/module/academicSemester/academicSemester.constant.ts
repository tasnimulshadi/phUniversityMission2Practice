import {
  TAcademicSemesterCode,
  TAcademicSemesterMonth,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface'

export const academicSemesterMonthArray: TAcademicSemesterMonth[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

export const academicSemesterNameArray: TAcademicSemesterName[] = [
  'summer',
  'spring',
  'fall',
]

export const academicSemesterCodeArray: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  summer: '01',
  spring: '02',
  fall: '03',
}

