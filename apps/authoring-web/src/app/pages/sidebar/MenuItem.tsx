import { useMapPermissions } from '../../hooks/usePermissions/useMapPermissions';
import { MenuBox, MenuTypography } from './sidebar.style';
const MenuItem = ({
  selectedType,
  item,
  index,
  type,
  handlePagesType,
  handleClick,
}) => {
  const { hasNavigationAccess } = useMapPermissions();
  return (
    <>
      <MenuBox
        disabled={!hasNavigationAccess(item.name?.toLowerCase())}
        key={`${item.name}${index}`}
        className={
          selectedType &&
          item.name &&
          selectedType.toLowerCase() == item.name.toLowerCase()
            ? 'activeLink'
            : ''
        }
        onClick={
          type?.toLowerCase() === 'pages'
            ? () => handlePagesType(item)
            : () => handleClick(item?.url)
        }
      >
        <item.icon
          sx={{
            fontSize: '17px',
            color: '#2d2d39',
            margin: '0 15px 20px 0',
          }}
        />
        <MenuTypography variant='h6regular'>{item.name}</MenuTypography>
        {selectedType &&
          item.name &&
          selectedType.toLowerCase() == item.name.toLowerCase()}
      </MenuBox>
    </>
  );
};

export default MenuItem;
