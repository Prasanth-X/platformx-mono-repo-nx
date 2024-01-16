import styled from 'styled-components'
import FeatureFlagSetting from './FeatureFlagSetting/FeatureFlagSetting'

/* eslint-disable-next-line */
export interface SiteSettingProps {}

const StyledSiteSetting = styled.div`
  color: pink;
`

export function SiteSetting(props: SiteSettingProps) {
  return (
    // <StyledSiteSetting>
    //   <h1>Welcome to SiteSetting!</h1>
    // </StyledSiteSetting>
    <FeatureFlagSetting/>
  )
}

export default SiteSetting
