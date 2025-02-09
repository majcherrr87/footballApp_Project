export interface Player {
    id: string
    firstName: string
    lastName: string
    teamId: string
    teamName: string
}

export interface PlayerDto {
    firstName: string
    lastName: string
    teamId: string
    teamName: string
}

export interface Team {
    id: string
    name: string
    year: number
    location: string
}

export interface TeamDto {
    name: string
    year: number
    location: string
}

export interface Result {
    team1: number
    team2: number
}

export interface Game {
    id: string
    date: string
    title: string
    place: string
    duration: number
    score: Result
    team1Id: string
    team2Id: string
}

export interface GameDto {
    date: string
    title: string
    place: string
    duration: number
    score: Result
    team1Id: string
    team2Id: string
}
