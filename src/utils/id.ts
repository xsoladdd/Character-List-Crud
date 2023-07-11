import short from 'short-uuid'

export const generateID = () => short().generate()


// Utilizes Birthday Paradox
// export const generateID = () => {
//     const firstPart = (Math.random() * 46656) | 0;
//     const secondPart = (Math.random() * 46656) | 0;
//     const stringf1 = ("000" + firstPart.toString(36)).slice(-3);
//     const stringf2 = ("000" + secondPart.toString(36)).slice(-3);
//     return stringf1 + stringf2;
// }