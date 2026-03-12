export interface BuildInfo {
  result: {
    builds: {
      [versionId: string]: {
        trigger: {
          trigger_uuid: string
        }
        build_trigger_metadata: {
          branch: string
          commit_hash: string
        }
      }
    }
  }
}
