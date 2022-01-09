import { IttyRequest } from '../types'
import { response } from './utils'
import { Feedback } from '@prole/model'

declare const HELP_EMAIL_TO: string
declare const HELP_EMAIL_FROM: string

declare const SEND_GRID_SECRET: string

/**
 * Takes feedback sent via the help form and emails it
 * @param request
 */
export const feedback = async (request: IttyRequest) => {
  if (!request.json) {
    return response(400, { messages: ['no request payload provided'] })
  }

  const { feedback, email, subject }: Feedback = await request.json()

  if (!feedback) {
    return response(400, { messages: 'feedback content must be provided' })
  }

  const sendResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SEND_GRID_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: HELP_EMAIL_TO }] }],
      from: { email: HELP_EMAIL_FROM },
      subject: `New Prole feedback: ${subject || ''}`,
      content: [
        {
          type: 'text/plain',
          value: `${feedback} \nfrom: ${email}`,
        },
      ],
    }),
  })

  if (!sendResponse.ok) {
    return response(500, { errors: ['something went wrong, try again'] })
  }

  return response(200, { messages: ['submitted feedback'] })
}
