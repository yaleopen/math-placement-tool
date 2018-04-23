import React, {Component} from 'react'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Modal, {ModalHeader,ModalBody,ModalFooter} from '@instructure/ui-overlays/lib/components/Modal'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import AccessibleContent from '@instructure/ui-a11y/lib/components/AccessibleContent'
import Select from '@instructure/ui-forms/lib/components/Select'
import TextInput from '@instructure/ui-forms/lib/components/TextInput'
import Grid, {GridRow,GridCol} from '@instructure/ui-layout/lib/components/Grid'
import NumberInput from '@instructure/ui-forms/lib/components/NumberInput'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Table from '@instructure/ui-elements/lib/components/Table'

function EditRubricModal(props) {
    return (
        <div>
            <Modal
                open={props.show}
                onDismiss={props.onDismiss}
                size="medium"
                label="Modal Dialog: Hello World"
                shouldCloseOnDocumentClick
            >
                <ModalHeader>
                    <CloseModalButton onDismiss={props.onDismiss}/>
                    <Heading>Edit Rubric</Heading>
                </ModalHeader>
                <ModalBody>
                    <RubricTextInputFields/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onDismiss}>Close</Button>&nbsp;
                    <Button onClick={props.onDismiss} variant="primary">Submit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

function RubricTextInputFields() {
    return(
        <Grid colSpacing="large" rowSpacing="small">
            <GridRow>
                <GridCol>
                    <TextInput label="Title"/>
                </GridCol>
                <GridCol>
                    <TextInput label="Course Placement"/>
                </GridCol>
            </GridRow>
            <GridRow>
                <GridCol>
                    <TextInput label="Feedback"/>
                </GridCol>
            </GridRow>
            <GridRow>
                <GridCol>
                    <EquationTable/>
                </GridCol>
            </GridRow>
        </Grid>
    )
}

function EquationTable() {
    return (
        <Table
            caption={<ScreenReaderContent>Managed Equations</ScreenReaderContent>}
        >
            <thead>
            <tr>
                <th width="60%" scope="col">Equation</th>
                <th width="20%" scope="col">Operator</th>
                <th width="20%" scope="col">Value</th>
            </tr>
            </thead>
            <tbody>
                <EquationTableRow/>
            </tbody>
        </Table>
    )
}

function EquationTableRow() {
    return (
        <tr>
            <td><QuizOptions/></td>
            <td>
                <Select label={<ScreenReaderContent>List of Quizzes</ScreenReaderContent>}>
                    <option value="apples">==</option>
                    <option value="oranges">&lt;</option>
                    <option value="bananas">&gt;</option>
                </Select>
            </td>
            <td>
                <NumberInput
                    width="10rem"
                    showArrows={false}
                    label={<ScreenReaderContent>List of Quizzes</ScreenReaderContent>}
                />
            </td>
        </tr>
    )
}

function QuizOptions(props) {
    const options = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District Of Columbia',
        'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois'
    ];

    return (
        <Select label={<ScreenReaderContent>List of Quizzes</ScreenReaderContent>}
                editable
                formatSelectedOption={(tag) => (
                    <AccessibleContent alt={`Remove ${tag.label}`}>{tag.label}</AccessibleContent>
                )}
        >
            {options.map((label, index) => (
                <option key={label} value={'' + index}>
                    {label}
                </option>
            ))}
        </Select>
    )

}

function CloseModalButton(props) {
    return(
        <CloseButton
            placement="end"
            offset="medium"
            variant="icon"
            onClick={props.onDismiss}
        >
            Close
        </CloseButton>
    )
}

export default EditRubricModal;