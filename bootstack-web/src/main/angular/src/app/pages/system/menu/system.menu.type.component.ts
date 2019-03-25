/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {Subscription} from "rxjs";
import {SystemMenuTypeService} from "../../../../services/system/system.menu.type.service";
import {CommonPageModel} from "../../../shared/model/common/response/page.model";
import {CodeConfig} from "../../../../config/code.config";

@Component({
    selector: 'bootstack-system-menu-type',
    templateUrl: './system.menu.type.component.html'
})
export class SystemMenuTypeComponent implements OnInit {

    public loading: Subscription;
    // menu list
    private datas;
    // page model
    public page: CommonPageModel;
    // current page number
    public currentPage: number;

    constructor(private router: Router,
                private toastyService: ToastyService,
                private systemMenuTypeService: SystemMenuTypeService) {
        this.page = new CommonPageModel();
    }

    ngOnInit() {
        this.datas = this.initList(this.page, 1);
    }

    initList(page: CommonPageModel, uid: number) {
        this.loading = this.systemMenuTypeService.getList(page).subscribe(
            response => {
                if (response.code !== CodeConfig.SUCCESS) {
                    this.toastyService.error(response.message);
                } else {
                    this.datas = response.data.content;
                    this.page = CommonPageModel.getPage(response.data);
                    this.currentPage = this.page.number;
                }
            }
        );
    }

}
