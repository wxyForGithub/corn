export function doAsync (fnPromise) {
  return fnPromise.then((res) => [null, res]).catch((error) => [error])
}
