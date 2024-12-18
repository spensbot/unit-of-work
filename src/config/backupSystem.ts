import { Log } from "../util/Log"
import { eqDeepSimple } from "../util/util"
import { resetState, RootState, store } from "./store"

// Everything in MS

const getTimestamp = () => Date.now()
const getBackupKey = (timestamp: number) => `backup-${timestamp}`
const BACKUP_LIST_KEY: string = "backup-list"

function saveBackupList(list: number[]) {
  save(BACKUP_LIST_KEY, list)
}

function loadBackupList(): number[] {
  return load(BACKUP_LIST_KEY) || []
}

function logBackupInfo() {
  const backupList = loadBackupList()
  Log.Info(`Attempting backup. Total backups: ${backupList.length}. Last: ${debugTimestamp(backupList[backupList.length - 1])}. First: ${debugTimestamp(backupList[0])}`)
}

function debugTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

function saveBackup(backup: RootState) {
  const timestamp = getTimestamp()
  const backupKey = getBackupKey(timestamp)
  const backupList = loadBackupList()
  backupList.push(timestamp)
  saveBackupList(backupList)
  save(backupKey, backup)
}

function saveBackupIfDifferentAndIntervalPassed(backup: RootState, backupPeriodMs: number) {
  logBackupInfo()
  if (getMsTillNextBackup(backupPeriodMs) <= 0) {
    const lastBackup = loadLastBackup()
    if (!eqDeepSimple(backup, lastBackup)) {
      saveBackup(backup)
    } else {
      Log.Info("Skipping backup because state hasn't changed.")
    }
  } else {
    Log.Info(`Skipping backup because period hasn't passed yet. ${(getMsTillNextBackup(backupPeriodMs) / 60000).toFixed(2)} minutes remaining.`)
  }
}

function loadLastBackup(): RootState | null {
  const list = loadBackupList()
  return loadBackup(list[list.length - 1])
}

function loadBackup(timestamp: number): RootState | null {
  return load(getBackupKey(timestamp))
}

function getMsTillNextBackup(backupPeriodMs: number): number {
  const lastBackup = loadBackupList().pop() ?? 0
  return backupPeriodMs - (getTimestamp() - lastBackup)
}

export function beginBackupSystem(backupPeriodMs: number) {
  saveBackupIfDifferentAndIntervalPassed(store.getState(), backupPeriodMs)

  setInterval(() => {
    saveBackupIfDifferentAndIntervalPassed(store.getState(), backupPeriodMs)
  }, backupPeriodMs)
}

function save<T>(key: string, t: T) {
  localStorage.setItem(key, JSON.stringify(t))
}

function load<T>(key: string): T | null {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}
