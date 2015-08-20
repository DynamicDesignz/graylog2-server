import React from 'react';
import Immutable from 'immutable';

import { TabbedArea, TabPane, Button, ButtonGroup} from 'react-bootstrap';

import TableList from '../common/TableList';
import DataTable from '../common/DataTable';

const PermissionSelector = React.createClass({

  _toggleStreamReadPermissions(stream) {
    this._toggleReadPermissions('streams', Immutable.Set.of(stream.id));
  },
  _toggleStreamEditPermissions(stream) {
    this._toggleEditPermissions('streams', Immutable.Set.of(stream.id));
  },

  _toggleDashboardReadPermissions(dashboard) {
    this._toggleReadPermissions('dashboards', Immutable.Set.of(dashboard.id));
  },
  _toggleDashboardEditPermissions(dashboard) {
    this._toggleEditPermissions('dashboards', Immutable.Set.of(dashboard.id));
  },

  _toggleReadPermissions(target, idList) {
    let added = Immutable.Set();
    let deleted = Immutable.Set();

    idList.forEach((id) => {
      const readTarget = target + ':read:' + id;
      const editTarget = target + ':edit:' + id;

      if (this.props.permissions.contains(readTarget)) {
        deleted = deleted.add(readTarget).add(editTarget);
      } else {
        added = added.add(readTarget);
      }
    }, this);
    this.props.onChange(added, deleted);
  },
  _toggleEditPermissions(target, idList) {
    let added = Immutable.Set();
    let deleted = Immutable.Set();

    idList.forEach((id) => {
      const readTarget = target + ':read:' + id;
      const editTarget = target + ':edit:' + id;

      if (this.props.permissions.contains(editTarget)) {
        deleted = deleted.add(editTarget);
      } else {
        added = added.add(readTarget).add(editTarget);
      }
    }, this);
    this.props.onChange(added, deleted);
  },

  _toggleAllStreamsRead(streamIds) {
    this._toggleReadPermissions('streams', streamIds);
  },
  _toggleAllStreamsEdit(streamIds) {
    this._toggleEditPermissions('streams', streamIds);
  },
  _toggleAllDashboardsRead(dashboardIds) {
    this._toggleReadPermissions('dashboards', dashboardIds);
  },
  _toggleAllDashboardsEdit(dashboardIds) {
    this._toggleEditPermissions('dashboards', dashboardIds);
  },

  render() {
    const streamItemButtons = (stream) => {
      const isRead = this.props.permissions.contains(`streams:read:${stream.id}`);
      const isEdit = this.props.permissions.contains(`streams:edit:${stream.id}`);
      return (<ButtonGroup bsSize="small">
        <Button bsStyle={isRead ? 'info' : 'default'} onClick={() => this._toggleStreamReadPermissions(stream)}
                active={isRead}>Allow reading</Button>
        <Button bsStyle={isEdit ? 'info' : 'default'} onClick={() => this._toggleStreamEditPermissions(stream)}
                active={isEdit}>Allow editing</Button>
      </ButtonGroup>);
    };

    const multiStreamButtons = (streamIds) => {
      return (
        <div className="pull-right" style={{marginTop: 10, marginBottom: 10}}>
          <Button bsSize="xsmall" bsStyle="info" onClick={() => this._toggleAllStreamsRead(streamIds)}>Toggle read permissions</Button>
          &nbsp;
          <Button bsSize="xsmall" bsStyle="info" onClick={() => this._toggleAllStreamsEdit(streamIds)}>Toggle edit permissions</Button>
        </div>
      );
    };

    const dashboardItemButtons = (dashboard) => {
      const isRead = this.props.permissions.contains(`dashboards:read:${dashboard.id}`);
      const isEdit = this.props.permissions.contains(`dashboards:edit:${dashboard.id}`);
      return (<ButtonGroup bsSize="small">
        <Button bsStyle={isRead ? 'info' : 'default'} onClick={() => this._toggleDashboardReadPermissions(dashboard)}
                active={isRead}>Allow reading</Button>
        <Button bsStyle={isEdit ? 'info' : 'default'} onClick={() => this._toggleDashboardEditPermissions(dashboard)}
                active={isEdit}>Allow editing</Button>
      </ButtonGroup>);
    };

    const multiDashboardButtons = (dashboardIds) => {
      return (
        <div className="pull-right" style={{marginTop: 10, marginBottom: 10}}>
          <Button bsSize="xsmall" bsStyle="info" onClick={() => this._toggleAllDashboardsRead(dashboardIds)}>Toggle read permissions</Button>
          &nbsp;
          <Button bsSize="xsmall" bsStyle="info" onClick={() => this._toggleAllDashboardsEdit(dashboardIds)}>Toggle edit permissions</Button>
        </div>
      );
    };

    return (
      <div>
        <TabbedArea defaultActiveKey={1} animation={false}>
          <TabPane eventKey={1} tab="Streams">
            <div style={{marginTop: 10}}>
              <TableList
                items={this.props.streams}
                filterLabel="Filter Streams"
                filterKeys={['title']}
                itemActionsFactory={streamItemButtons}
                headerActionsFactory={multiStreamButtons}
              />
            </div>
          </TabPane>
          <TabPane eventKey={2} tab="Dashboards">
            <div style={{marginTop: 10}}>
              <TableList
                items={this.props.dashboards}
                filterLabel="Filter Dashboards"
                filterKeys={['title']}
                itemActionsFactory={dashboardItemButtons}
                headerActionsFactory={multiDashboardButtons}
              />
            </div>
          </TabPane>
        </TabbedArea>
      </div>
    );
  },
});

export default PermissionSelector;
