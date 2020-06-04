import {
    css
} from 'linaria';

const wrapper = css `   
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    transform: translate(-50%, -50%);
`

const box = css `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px;
    padding: 30px;
    background: #5E7BEA;
    cursor: pointer;

`

const icon = css `
    height: 2rem;
    width: 2rem;
    color: #fff;
`

export default {
    wrapper,
    box,
    icon
};