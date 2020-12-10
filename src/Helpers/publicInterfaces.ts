export default interface iDDL {
  label: any;
  value: any;
  icon?: (() => JSX.Element) | undefined;
  hidden?: boolean | undefined;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
}
