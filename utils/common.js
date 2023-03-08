import i18next from '../i18n'

export const routerPushWithLang = (router, path) => {
  const query = {}
  if (router.query.lng) {
    query['lng'] = router.query.lng
  }
  router.push({
    pathname: path,
    query,
  })
}

export const updateLanguage = (ctx) => {
  console.log(ctx.query.lng, "ctx.query.lng");
  const defaultLng = 'en-US' // this can come from backend based on user profile
  const lng = ctx.query.lng || defaultLng

  i18next.changeLanguage(lng)
}
