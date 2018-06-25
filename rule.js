'use strict';

module.exports = {
    new_url: '172.26.224.139',
    new_port: '9001',
    summary: 'the tax rule for AnyProxy',
    username: '',
    startdate: '',
    /**
   *
   *
   * @param {object} requestDetail
   * @param {string} requestDetail.protocol
   * @param {object} requestDetail.requestOptions
   * @param {object} requestDetail.requestData
   * @param {object} requestDetail.response
   * @param {number} requestDetail.response.statusCode
   * @param {object} requestDetail.response.header
   * @param {buffer} requestDetail.response.body
   * @returns
   */
    * beforeSendRequest(requestDetail) {
        const newRequestbody = requestDetail.requestOptions;
        if (requestDetail.requestData.toString().indexOf("SELECTVAL=91210231674097638X") != -1 || requestDetail.requestData.toString().indexOf("NSRSBH=91210231674097638X") != -1 || requestDetail.requestData.toString().indexOf("SELECTVAL=91210231341162876K") != -1 || requestDetail.requestData.toString().indexOf("NSRSBH=91210231341162876K") != -1) {
            //2017:查询打印,(1)
            if (requestDetail.url.indexOf("http://wssb.dlntax.gov.cn:9901/hlwsb/cxdy/getSB_SBJG") != -1) {
                if (requestDetail.requestData.toString().indexOf("RQQ=2018-03-01") != -1 && requestDetail.requestData.toString().indexOf("RQZ=2018-03-31") != -1) {
                    const newRequestOptions = requestDetail.requestOptions;
                    newRequestOptions.hostname = this.new_url;
                    newRequestOptions.path = '/tax/getSbjg?' + requestDetail.requestData.toString();
                    newRequestOptions.port = this.new_port;
                    //console.log(newRequestOptions);
                    newRequestOptions.method = 'GET';
                }
            }
            //2017:查询打印,(2)
            if (requestDetail.url.indexOf("http://wssb.dlntax.gov.cn:9901/hlwsb/cxdy/getSB_SBJG_LIST") != -1) {
                if (requestDetail.requestData.toString().indexOf("SSSQ_Q=2018-03-01") != -1 && requestDetail.requestData.toString().indexOf("SSSQ_Z=2018-03-31") != -1) {
                    const newRequestOptions = requestDetail.requestOptions;
                    newRequestOptions.hostname = this.new_url;
                    newRequestOptions.path = '/tax/getSbjgList?' + requestDetail.requestData.toString();
                    newRequestOptions.port = this.new_port;
                    newRequestOptions.method = 'GET';
                }
            }
            //2017:查询打印,(2):打印
            if (requestDetail.url.indexOf("http://wssb.dlntax.gov.cn:9901/hlwsb/zzs/ybnsr/getSB_ZZS_YBNSR.do") != -1) {
                if (requestDetail.requestData.toString().indexOf("SSSQ_Q=2018-03-01") != -1 && requestDetail.requestData.toString().indexOf("SSSQ_Z=2018-03-31") != -1 || requestDetail.requestData.toString().indexOf("SSSQ_Q=2017-12-01") != -1 && requestDetail.requestData.toString().indexOf("SSSQ_Z=2017-12-31") != -1) {
                    const newRequestOptions = requestDetail.requestOptions;
                    newRequestOptions.hostname = this.new_url;
                    newRequestOptions.path = '/tax/getYbnsr?' + requestDetail.requestData.toString();
                    newRequestOptions.port = this.new_port;
                }
            }
        }
        if (this.username.indexOf("91210231674097638X") != -1|| this.username.indexOf("91210231341162876K") != -1) {
            // //2018:查询打印
            if (requestDetail.url.indexOf("http://wssb2018.dlntax.gov.cn:7004/sbzs-cjpt-web/sbxxcx/getSbxxcx.do") != -1) {
                this.startdate = requestDetail.url.substring(requestDetail.url.indexOf("skssqq="), requestDetail.url.indexOf("skssqq=") + 17);
            }

            if (requestDetail.url.indexOf("http://wssb2018.dlntax.gov.cn:7004/zlpz-cjpt-web/zlpz/viewOrDownloadPdfFile.do") != -1) {
                const newRequestOptions = requestDetail.requestOptions;
                newRequestOptions.hostname = this.new_url;
                var srs = newRequestOptions.path.substring(newRequestOptions.path.indexOf("?"));
                newRequestOptions.path = '/tax/sendStream' + srs + "&startdate=" + this.startdate + "&username=" + this.username;
                console.log(newRequestOptions.path);
                newRequestOptions.port = this.new_port;
            }
        }
    },
    /**
   *
   *
   * @param {object} requestDetail
   * @param {object} responseDetail
   */
    * beforeSendResponse(requestDetail, responseDetail) {
        if (requestDetail.url.indexOf("http://wssb.dlntax.gov.cn:9901/hlwsb/zzs_print/ybnsr/sb_zzs_ybnsr_fb") != -1) {

            return {
                response: {
                    statusCode: 500
                }
            };
        }

        if (requestDetail.url.indexOf("http://wssb2018.dlntax.gov.cn:7004/xxmh/portalSer/checkLogin.do") != -1) {
            var newResponse = Object.assign({},
            responseDetail.response);
//             var Json = require('Json');
//             if (Json.parse(newResponse.body).info) {
//                 if (Json.parse(newResponse.body).info.nsr) {
//                     this.username = Json.parse(newResponse.body).info.nsr.dsnsrsbh;
//                 }
//             }
            if(newResponse.body.toString().indexOf("91210231674097638X")!=-1){
                this.username="91210231674097638X"
            }else if (newResponse.body.toString().indexOf("91210231341162876K")!=-1){
                this.username="91210231341162876K"
            }
            console.log(this.username);
        }
        

    },

    /**
   * default to return null
   * the user MUST return a boolean when they do implement the interface in rule
   *
   * @param {any} requestDetail
   * @returns
   */
    * beforeDealHttpsRequest(requestDetail) {
        return null;
    },

    /**
   *
   *
   * @param {any} requestDetail
   * @param {any} error
   * @returns
   */
    * onError(requestDetail, error) {
        return null;
    },

    /**
   *
   *
   * @param {any} requestDetail
   * @param {any} error
   * @returns
   */
    * onConnectError(requestDetail, error) {
        return null;
    },
};
