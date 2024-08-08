export async function addMrNote({
  gitlabToken,
  gitlabHost,
  projectId,
  mrId,
  note,
}: {
  gitlabToken: string
  gitlabHost: string
  projectId: string
  mrId: string
  note: string
}) {
  const createNotePath = `${gitlabHost}/api/v4/projects/${projectId}/merge_requests/${mrId}/notes`

  fetch(createNotePath, {
    method: 'POST',
    headers: {
      'Private-Token': gitlabToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      body: note,
    }),
  })
}
