import {
    css
} from 'linaria';

export const chat = css `
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 2rem;
`

export const message = css `
    margin-bottom: 1.5rem;
`

export const row = css `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`

export const author = css `
    font-size: 1.4rem;
    color: #0788FF;
`

export const timestamp = css `
    font-size: 12px;
    color: #999;
`

export const text = css `
    font-size: 1.4rem;
    line-height: 1.5;
    color: #434448;
`

export const temp = css `
    font-size: 2.4rem;
    color: #444;
`

export default {
    chat,
    message,
    row,
    author,
    timestamp,
    text,
    temp
}