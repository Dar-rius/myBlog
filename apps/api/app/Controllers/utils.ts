import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'

// Function to check that password_1 ans password_2 is same
export function checkPassword(password_1: string, password_2: string): boolean {
  if (password_1 === password_2) {
    return true
  } else {
    throw false
  }
}

// Function to save file in folder uploads
export async function saveFile(file: any) {
  if (file) {
    await file.move(Application.tmpPath('uploads'))
    return true
  } else {
    throw false
  }
}

// Function to delete a old file and save new file
// then update blog
export async function changeFile(file: any) {
  if (file) {
    await Drive.delete(file.fileName)
    await file.move(Application.tmpPath('uploads'))
    return true
  } else {
    throw false
  }
}
