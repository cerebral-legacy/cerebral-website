export function toUrlName(name) {
  return name.toLowerCase().replace(/\s/g, '_');
}

export function fromUrlName(name) {
  return name[0].toUpperCase() + name.substr(1).replace(/_/g, ' ');
}
