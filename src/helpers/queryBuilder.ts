function queryBuilder(query: string, replacements: Record<string, string>) {
  let finalQuery = query

  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    const escapedPlaceholder = placeholder.replace(/[\^{}]/g, '\\$&')
    finalQuery = finalQuery.replace(new RegExp(escapedPlaceholder, "g"), replacement)
  })

  return finalQuery
}

export { queryBuilder }