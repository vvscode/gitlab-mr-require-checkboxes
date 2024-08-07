# gitlab-mr-require-checkboxes

## [CLI] Require checkboxes in GitLab MR description to be checked

A simple CLI tool to check that all checkboxes in a merge request description are checked is designed as follows:

- Fetch Merge Request Data: The tool connects to the Git repository hosting service (e.g., GitHub, GitLab) and retrieves the merge request description.
- Parse Checkboxes: It parses the description to identify all checkboxes.
- Check Checkbox Status: It verifies that all checkboxes are marked as checked.
- Exit with status code 1 if there are non ticked checkboxes.

Related links:

- [How Can We Check All Checkbox Are Checked in Gitlab Merge Request Template](https://stackoverflow.com/questions/73302452/how-can-we-check-all-checkbox-are-checked-in-gitlab-merge-request-template)
- [Can I require a "sign-off" checkbox to be checked before a merge can be done?](https://stackoverflow.com/questions/68802300/can-i-require-a-sign-off-checkbox-to-be-checked-before-a-merge-can-be-done)

The cli uses environment variables to pass settings: 

- `GITLAB_API_TOKEN` - this one you need to create, it's used to access gitlab API
- `CI_PROJECT_ID`, `CI_MERGE_REQUEST_IID`, `CI_SERVER_URL` are passed to pipeline by Gitlab
