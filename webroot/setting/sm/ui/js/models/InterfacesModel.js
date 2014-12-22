/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var InterfacesModel = ContrailModel.extend({

        defaultConfig: smwmc.getInterfaceModel(),

        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model(),
                attr = smwu.getAttributeFromPath(attributePath),
                errors = model.get(smwc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;

            isValid = model.isValid(attributePath, validation);

            attrErrorObj[attr + smwc.ERROR_SUFFIX_ID] = (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        },

        validations: {
            physicalValidation: {
                'name': {
                    required: true,
                    msg: smwm.getRequiredMessage('name')
                },
                'ip_address': {
                    required: true,
                    pattern: smwc.PATTERN_IP_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('ip_address')
                },
                'mac_address': {
                    required: true,
                    pattern: smwc.PATTERN_MAC_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('mac_address')
                },
                'default_gateway': {
                    required: true,
                    pattern: smwc.PATTERN_IP_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('gateway')
                }
            },
            bondValidation: {
                'name': {
                    required: true,
                    msg: smwm.getRequiredMessage('name')
                }
            },
            subinterfaceValidation: {
                'name': {
                    required: true,
                    msg: smwm.getRequiredMessage('name')
                }
            }
        }
    });

    return InterfacesModel;
});
