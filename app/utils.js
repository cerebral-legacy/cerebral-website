export function toUrlName(name) {
  return name.toLowerCase().replace(/\s/g, '_');
}

export function fromUrlName(name) {
  if (name.indexOf('-') >= 0) {
    return name.replace(/_/g, '');
  }
  return name[0].toUpperCase() + name.substr(1).replace(/_/g, ' ');
}
