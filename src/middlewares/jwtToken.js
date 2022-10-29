const ACCESS_TOKEN_SECRET = 'I^WUEtV#W@Nr%!kkKGwb7Q#e3Ehj3Ksy7p94*2+7YTkp!Ip7SJ'
const REFRESH_TOKEN_SECRET = 'Vb$K#p!NpZ!Z7xUE$&c4a*ahCChRs&jsG$vkV*YAy&t#W2Wp^ICmVep(ZLgm7D$A'



export const createAccessToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
export const createRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}