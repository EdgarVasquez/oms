import React from 'react';
import PropTypes from 'prop-types';
import { tableStyle } from 'variables/styles';
import {
    withStyles, Table, TableHead, TableRow, TableBody, TableCell,Modal, Button, TextField
} from 'material-ui';
import {Edit,Delete} from 'material-ui-icons';


class CustomTable extends React.Component {
    render(){
        const { classes, tableHead, tableData, tableHeaderColor } = this.props;
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {
                        tableHead !== undefined ? (
                            <TableHead className={classes[tableHeaderColor+"TableHeader"]}>
                                <TableRow>
                                    {
                                        tableHead.map((prop,key) => {
                                            return (
                                                <TableCell
                                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                                    key={key}>
                                                    {prop}
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                        ):null
                    }
                    <TableBody>
                        {
                            tableData.map((prop,key) => {
                                return (
                                    <TableRow key={key}>
                                        {
                                            prop.map((prop,key) => {
                                                return (
                                                    <TableCell
                                                        className={classes.tableCell}
                                                        key={key}>
                                                        {prop}
                                                    </TableCell>
                                                );
                                            })
                                        }
                                        <Edit/>
                                        <Delete/>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        );
    }
}

CustomTable.defaultProps = {
    tableHeaderColor: 'gray'
}

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf(['warning','primary','danger','success','info','rose','gray']),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
