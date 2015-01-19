/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'common/ui/js/models/ContrailModel'
], function (_, ContrailModel) {
    var InterfacesModel = ContrailModel.extend({

        defaultConfig: {
            "baremetal_interface" : [],
            "vn" : []
        },

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
            baremetalInterfaceValidation: {
                'baremetal_interface': {
                    required: true,
                    pattern: smwc.PATTERN_MAC_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('mac_address')
                },
                'vn': {
                    required: true,
                    pattern: smwc.PATTERN_IP_ADDRESS,
                    msg: smwm.getShortInvalidErrorMessage('gateway')
                }
            }
        }
    });

    return InterfacesModel;
});
