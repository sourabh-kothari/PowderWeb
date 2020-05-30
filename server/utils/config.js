
const jsonfile = require('jsonfile')
const uniqueString = require('unique-string')
const path = require('path')

const { app } = require('electron')

const configPath = path.join(app.getPath('appData'), 'PowderWeb', 'config.json')

let map = {
//    torrentContent: false,
    peerPort: 6881,
    maxPeers: 200,
//    bufferSize: 7000,
    removeLogic: 0,
//    downloadType: 0,
//    casting: {},
//    dlnaFinder: 0,
    extPlayer: false,
    playerCmdArgs: '',
    extTorrentClient: false,
    torrentCmdArgs: '',
    speedLimit: 0,
    downloadAll: true,
    forceDownload: false,
    peerID: 'PW0700',
    maxConcurrency: 2,
    maxUsers: 0,
    webServerPort: 3000,
    webServerSSL: false,
    downloadFolder: '',
    torrentTrackers: '',

    ytdlQuality: 2,

    subLimit: 0,

    jackettHost: 'http://localhost:9117/',
    jackettKey: '',

    verifyFiles: true,

    embedToken: uniqueString(),

    useWebPlayerAssoc: false,

    useFilenameStream: true,
    torrentNotifs: true,

    fastResume: true,

    userCommands: '',

    subsOnlyHash: false,

    subLangs: 'all',

    downloadSubs: false

}

function loadUserConfig(err, obj) {
    if (err) {

        try {
            jsonfile.atomicWriteFileSync(configPath, map)
        } catch(e) {
            // ignore error here
        }

        return map

    } else {
        let changed

        for (let key in map)
            if (!obj.hasOwnProperty(key)) {
                obj[key] = map[key]
                changed = true
            }

        if (changed)
            jsonfile.atomicWriteFileSync(configPath, obj)

        return obj
    }
}

const config = {
    loaded: false,
	getAll: () => {
        if (!config.loaded) {

            let obj, err

            try {
                obj = jsonfile.readFileSync(configPath)
            } catch(e) {
                err = e
            }

            map = loadUserConfig(err, obj)

            config.loaded = true

        }
		return map
	},
    get: str => {
        if (!config.loaded) {

            let obj, err

            try {
                obj = jsonfile.readFileSync(configPath)
            } catch(e) {
                err = e
            }

            map = loadUserConfig(err, obj)

            config.loaded = true

        }
        return map[str]
    },
	set: (str, value) => {
		map[str] = value
		jsonfile.atomicWriteFileSync(configPath, map)
	},
	has: key => {
		return map.hasOwnProperty(key)
	}
}

module.exports = config

