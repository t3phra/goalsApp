import React, { useState } from 'react'
import {
  FormGroup,
  Checkbox,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Add as AddIcon, ChevronRight } from '@material-ui/icons'

import SubGoalDialog from './SubGoalDialog'
import useStyles from './GoalCustomization.style'
import SubgoalMenu from './SubgoalMenu'

const DATE_OPTIONS = [
  { name: 'week', label: '1 Неделя' },
  { name: 'month', label: '1 Месяц' },
  { name: 'year', label: '1 Год' },
]

const GoalCustomization = (props) => {
  const classes = useStyles()
  const {
    customizationOptions: { subgoals, date },
    setCustomizationOptions,
  } = props
  const [newSubgoalName, setNewSubgoalname] = useState('')
  const [isSubgoalDialogOpen, setIsSubgoalDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleSubGoalDialogOpen = () => setIsSubgoalDialogOpen(true)

  const handleSubGoalDialogClose = () => {
    setIsSubgoalDialogOpen(false)
  }

  const handleAddSubgoal = (evt) => {
    evt.preventDefault()
    setIsSubgoalDialogOpen(false)
    setCustomizationOptions((prevCustomizationOptions) => ({
      ...prevCustomizationOptions,
      subgoals: [
        ...prevCustomizationOptions.subgoals,
        {
          title: newSubgoalName,
          completed: false,
        },
      ],
    }))
    setNewSubgoalname('')
  }

  const handleDeleteSubgoal = (index) => {
    setCustomizationOptions((prevCustomizationOptions) => ({
      ...prevCustomizationOptions,
      subgoals: prevCustomizationOptions.subgoals.filter((_, i) => i !== index),
    }))
  }

  const handleSubgoalNameChange = (evt) => {
    setNewSubgoalname(evt.target.value.trimLeft())
  }

  const handleChange = (evt) => {
    const { name, checked } = evt.target
    setCustomizationOptions((prevCustomizationOptions) => ({
      ...prevCustomizationOptions,
      date: {
        week: false,
        month: false,
        year: false,
        [name]: checked,
      },
    }))
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <FormControl>
        <FormLabel component="legend">Выберите срок</FormLabel>
        <FormGroup row>
          {DATE_OPTIONS.map((option) => (
            <FormControlLabel
              key={option.name}
              control={
                <Checkbox
                  checked={date[option.name]}
                  onChange={handleChange}
                  name={option.name}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        <FormHelperText
          classes={{
            root: classes.subgoalHelperText,
          }}
        >
          За сколько вы планируете выполнить свою цель?
        </FormHelperText>
      </FormControl>
      <hr />
      {subgoals.length ? (
        <List className={classes.subgoalList}>
          {subgoals.map((subgoal, i) => (
            <React.Fragment key={`subgoal${i + 1}`}>
              <ListItem
                className={classes.subgoalListItem}
                aria-controls="subgoal-menu"
                onClick={handleOpenMenu}
              >
                <ListItemIcon classes={{root: classes.listItem}}>
                  <ChevronRight />
                </ListItemIcon>
                <ListItemText>{subgoal.title}</ListItemText>
              </ListItem>
              <SubgoalMenu
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                onDelete={handleDeleteSubgoal}
                index={i}
              />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <FormLabel style={{ display: 'block' }}>
          Сложная цель? Добавьте промежуточные шаги.
        </FormLabel>
      )}
      <Button
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
        className={classes.addSubgoalButton}
        onClick={handleSubGoalDialogOpen}
        disabled={subgoals.length === 10}
      >
        Добавить
      </Button>
      <FormHelperText
        classes={{
          root: classes.subgoalHelperText,
        }}
      >
        Максимальное количество - 10 шагов. Если для выполнения вашей цели
        требуется больше 10 шагов, может лучше разделить эту цель на несколько
        маленьких?
      </FormHelperText>
      <SubGoalDialog
        open={isSubgoalDialogOpen}
        onClose={handleSubGoalDialogClose}
        onChange={handleSubgoalNameChange}
        newSubgoalName={newSubgoalName}
        addSubgoal={handleAddSubgoal}
      />
    </div>
  )
}

GoalCustomization.propTypes = {
  customizationOptions: PropTypes.shape({
    date: PropTypes.shape({
      week: PropTypes.bool.isRequired,
      month: PropTypes.bool.isRequired,
      year: PropTypes.bool.isRequired,
    }).isRequired,
    subgoals: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  setCustomizationOptions: PropTypes.func.isRequired,
}

export default GoalCustomization
