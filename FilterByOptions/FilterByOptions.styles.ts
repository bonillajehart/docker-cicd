import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

// filters
const FilterAnchor = styled(Button)`
  padding: 4px 16px;
  font-size: 14px;
  text-transform: none;
  margin-right: 4px;

  & .MuiButton-endIcon {
    margin-left: 4px;
  }

  &.opened,
  &:hover {
    background: none;
    color: #988cff;
  }

  & svg {
    fill: #cbcfd3;
  }

  &.active {
    font-weight: bold;
    background-color: #e6e4fd;
    color: #675ef3;

    & svg {
      fill: #988cff;
    }
  }
`;

const FilterDialog = styled(Popper)`
  z-index: 2;
`;

const FilterDialogContainer = styled(Paper)`
  padding: 8px 0 0;
  width: 420px;
`;

const FilterActionsContainer = styled(Grid)`
  padding: 8px 14px;
`;

const ListItemOption = styled(ListItem)`
  padding: 16px 20px;

  &.Mui-selected {
    background-color: #f4f7f9;

    & p {
      font-weight: bold;
    }
  }

  &&.focused {
    background-color: #e6e4fd;
  }
` as typeof ListItem;

const DialogHeader = styled(Typography)`
  padding: 8px 14px;
`;

export const Styled = {
  FilterAnchor,
  FilterDialog,
  FilterDialogContainer,
  FilterActionsContainer,
  DialogHeader,
  ListItemOption,
};
