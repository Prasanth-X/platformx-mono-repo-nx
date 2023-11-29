export type AddSiteSelectProps = {
  value: string;
  handleDropDownChange: (event) => void;
  itemList: MenuItem[];
  isLanguageDropDown?: boolean;
  isDisabled?: boolean;
};

type MenuItem ={
  name:string,
  value:string
}
