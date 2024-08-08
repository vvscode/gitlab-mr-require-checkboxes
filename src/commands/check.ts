import { Argv } from 'yargs'
import { logger } from '../logger'
import { hasUnchecked } from '../utils/hasUnchecked'

interface GreetingArgv {}

export const command = 'check'
export const describe = 'Checks if all checkboxes in Gitlab MR are ticked'
export const aliases = ['c']

export function builder(yargs: Argv<GreetingArgv>): Argv {
  return yargs
}

export async function handler() {
  const gitlabToken = await (process.env.GITLAB_API_TOKEN ||
    logger.prompt('I do not see GITLAB_API_TOKEN environment variable. Please enter it:', { type: 'text' }))
  const projectId = await (process.env.CI_PROJECT_ID ||
    logger.prompt('I do not see CI_PROJECT_ID environment variable. Please enter it:', { type: 'text' }))
  const mrId = await (process.env.CI_MERGE_REQUEST_IID ||
    logger.prompt('I do not see CI_MERGE_REQUEST_IID environment variable. Please enter it:', { type: 'text' }))
  const gitlabHost = await (process.env.CI_SERVER_URL ||
    logger.prompt('I do not see CI_SERVER_URL environment variable. Please enter it:', { type: 'text' }))

  const gitlabApiUrl = `${gitlabHost}/api/v4/projects/${projectId}/merge_requests/${mrId}`

  try {
    const response = await fetch(gitlabApiUrl, {
      headers: {
        'Private-Token': gitlabToken,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Parse the response as JSON
    const data = await response.json()

    // Extract MR description
    const mrDescription = data.description
    logger.log('Merge Request Description:\n\n', mrDescription)

    if (await hasUnchecked(mrDescription)) {
      logger.error('There are unticked checkboxes')
      process.exit(1)
    }

    // Do something with the MR description
    // For example, you could set it as a CI/CD variable, log it, etc.
  } catch (error) {
    logger.error('Error fetching MR details:', error.message)
    process.exit(1) // Exit with error
  }
}
