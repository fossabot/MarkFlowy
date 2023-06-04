import customColors from '@/colors'
import styled from 'styled-components'

export const SettingGroupContainer = styled.div`
  padding: 1rem;
  font-size: 0.875rem;
  background-color: ${customColors.tipsBgColor};
  
  .setting-group {
    &__title {
      margin-bottom: 10px;
    }
  }

  .setting-item {
    display: flex;

    &__label {
      margin-right: 6px;
      flex-grow: 0;
      flex-shrink: 0;
    }

    &__form {
      flex-grow: 1;
      flex-shrink: 1;
    }
  }
`