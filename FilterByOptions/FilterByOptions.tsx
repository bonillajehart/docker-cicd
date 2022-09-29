import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { Styled as S } from './FilterByOptions.styles';

interface FilterByOptions {
  attributeName: string;
  anchorText: string;
  dialogHeaderText: string;
  options: {
    id: string;
    display: string;
  }[];
  onApply: (attributeName: string, value: string) => void;
}

const defaultOption = {
  id: 'all',
  display: 'All',
};

export const FilterByOptions: React.FC<FilterByOptions> = ({
  attributeName,
  anchorText,
  dialogHeaderText,
  options = [],
  onApply,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(defaultOption.id);
  const [appliedId, setAppliedId] = useState(defaultOption.id);
  const [focusedId, setFocusedId] = useState(defaultOption.id);

  const handleClose = () => {
    setSelectedId(appliedId); // reset on cancel
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget || null);
      setOpen(true);
    }
  };

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    setSelectedId(id);
  };

  // close and clickaway are separate because resetting anchorEl code interfere with setting another anchorEl
  const handleClickAway = () => {
    setOpen(false);
    setSelectedId(appliedId); // reset on cancel
  };

  const handleApply = () => {
    onApply(attributeName, selectedId);
    setAppliedId(selectedId);
    setAnchorEl(null);
    setOpen(false);
  };

  const getAnchorClassNames = (): string[] => {
    const classNames = [];

    if (open) {
      classNames.push('opened');
    }

    if (selectedId !== defaultOption.id) {
      classNames.push('active');
    }

    return classNames;
  };

  // @todo: auto scroll
  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      setSelectedId(focusedId);
    }

    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      const combinedOptions = [defaultOption, ...options];
      const focusedOptionIndex = combinedOptions.findIndex(({ id }) => id === focusedId);
      const newFocusedIdIndex = e.key === 'ArrowDown' ? focusedOptionIndex + 1 : focusedOptionIndex - 1;

      if (newFocusedIdIndex <= -1) {
        setFocusedId(combinedOptions[combinedOptions.length - 1].id);
      } else if (!combinedOptions[newFocusedIdIndex]) {
        setFocusedId(combinedOptions[0].id);
      } else {
        setFocusedId(combinedOptions[newFocusedIdIndex].id);
      }
    }
  };

  const handleOptionHover = (itemId: string) => {
    if (itemId !== focusedId) {
      setFocusedId(itemId);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <S.FilterAnchor
          className={getAnchorClassNames().join(' ')}
          disableTouchRipple
          onClick={handleClick}
          endIcon={open ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
          onKeyDown={handleKeyDown}
        >
          {anchorText}
        </S.FilterAnchor>

        <S.FilterDialog open={open} anchorEl={anchorEl} placement="bottom-start" transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <S.FilterDialogContainer elevation={8}>
                <S.DialogHeader>{dialogHeaderText}</S.DialogHeader>
                <List component="nav" onKeyDown={handleKeyDown}>
                  <S.ListItemOption
                    className={`${focusedId === defaultOption.id ? 'focused' : ''}`}
                    button
                    selected={selectedId === defaultOption.id}
                    onClick={(event) => handleListItemClick(event, 'all')}
                    onMouseMove={() => handleOptionHover(defaultOption.id)}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typography>{defaultOption.display}</Typography>
                      </Grid>
                      {selectedId === defaultOption.id && (
                        <Grid item>
                          <CheckIcon fontSize="small" color="primary" />
                        </Grid>
                      )}
                    </Grid>
                  </S.ListItemOption>

                  {options.map(({ id, display }) => (
                    <S.ListItemOption
                      key={id}
                      className={`${focusedId === id ? 'focused' : ''}`}
                      button
                      selected={selectedId === id}
                      onClick={(event) => handleListItemClick(event, id)}
                      onMouseMove={() => handleOptionHover(id)}
                    >
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography>{display}</Typography>
                        </Grid>
                        {selectedId === id && (
                          <Grid item>
                            <CheckIcon fontSize="small" color="primary" />
                          </Grid>
                        )}
                      </Grid>
                    </S.ListItemOption>
                  ))}
                </List>
                <S.FilterActionsContainer container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <Button variant="outlined" size="small" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" onClick={handleApply}>
                      Apply
                    </Button>
                  </Grid>
                </S.FilterActionsContainer>
              </S.FilterDialogContainer>
            </Fade>
          )}
        </S.FilterDialog>
      </div>
    </ClickAwayListener>
  );
};
