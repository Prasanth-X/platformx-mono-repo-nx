import MenuItem from './MenuItem';

const MenuList = ({
  type,
  selectedType,
  handlePagesType,
  subMenus,
  handleClick,
}) => {
  return (
    <>
      {subMenus?.map((item, index) => {
        return (
          <MenuItem
            key={`${item.name}${index}`}
            item={item}
            selectedType={selectedType}
            index={index}
            type={type}
            handleClick={handleClick}
            handlePagesType={handlePagesType}
          />
        );
      })}
    </>
  );
};

export default MenuList;
