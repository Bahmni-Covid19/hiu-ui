import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';

const useStyles = makeStyles(theme => ({
    detailPanel: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        backgroundColor: theme.palette.background.default
    }
}));

const getHiTypesText = hiTypes => {
    return hiTypes.join(', ');
};

const getPermissionDateRangeText = permission => {
    let fromDate = formatDateString(permission.dateRange.from, false);
    let toDate = formatDateString(permission.dateRange.to, false);
    return `${fromDate} - ${toDate}`;
};

const consentExpiredComponent = (expiryTimestamp) => {
    return (
        <Typography variant="body2">
            Consent Request <strong>Expired</strong> on {formatDateString(expiryTimestamp, true)}
        </Typography>
    )
}

const consentDeniedComponent = (deniedTimestamp) => {
    return (
        <Typography variant="body2">
            Consent Request <strong>Denied</strong> on {formatDateString(deniedTimestamp, true)}
        </Typography>
    )
}

const consentArtefactDetailsComponent = (consentArtefacts) => {
    return consentArtefacts.length === 0 ?
        <Grid item xs={12}>
            <Typography variant="body2">
                <strong>No Consent Artefacts available</strong>
            </Typography>
        </Grid> :
        (
            <Grid container>
                <Grid item xs={6}><Typography variant="body2">
                    <strong>Granted HI Types:</strong> {getHiTypesText(consentArtefacts[0].hiTypes)}
                </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">
                        <strong>Granted Date Range:</strong> {getPermissionDateRangeText(consentArtefacts[0].permission)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        <strong>Consent Artefacts:</strong>
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Facility Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Status Last Updated on</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {consentArtefacts.map((consentArtefact, index) => {
                                return (<TableRow>
                                    <TableCell>{consentArtefact.hipName}</TableCell>
                                    <TableCell>{consentArtefact.status}</TableCell>
                                    <TableCell>{formatDateString(consentArtefact.dateModified, true)}</TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        )
}


const ConsentDetailPanel = ({ consentDetail }) => {
    const classes = useStyles();
    const consentStatus = consentDetail.status;
    return (
        <Grid container spacing={1} className={classes.detailPanel}>
            <Grid item xs={6}>
                <Typography variant="body2">
                    <strong>Requested HI Types:</strong> {getHiTypesText(consentDetail.hiTypes)}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2">
                    <strong>Requested Date Range:</strong> {getPermissionDateRangeText(consentDetail.permission)}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {consentStatus === 'DENIED' && consentDeniedComponent(consentDetail.dateModified)}
                {consentStatus === 'EXPIRED' && consentExpiredComponent(consentDetail.expiredDate)}
                {(consentStatus === 'GRANTED' || consentStatus === 'REVOKED') && (
                    <Grid container>
                        {consentDetail.consentArtefacts.length === 0 ?
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    <strong>No Consent Artefacts available</strong>
                                </Typography>
                            </Grid>
                            :
                            (
                                consentArtefactDetailsComponent(consentDetail.consentArtefacts)
                            )}
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

ConsentDetailPanel.propTypes = {
    consentDetail: PropTypes.object.isRequired
};

export default ConsentDetailPanel;
