package com.shimh.controller.admin;

import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.support.spring.annotation.FastJsonFilter;
import com.alibaba.fastjson.support.spring.annotation.FastJsonView;

import com.shimh.common.annotation.LogAnnotation;
import com.shimh.common.result.Result;
import com.shimh.entity.Article;
import com.shimh.entity.Tag;
import com.shimh.entity.User;
import com.shimh.service.ArticleAdminService;
import com.shimh.vo.ArticleVo;
import com.shimh.vo.PageVo;

/**
 * 文章管理 API
 * 
 * @author miansen.wang
 * @date 2020-04-16
 */
@RestController
@RequestMapping(value = "/admin/article")
public class ArticleAdminController {

	@Autowired
    private ArticleAdminService articleAdminService;
	
	@PostMapping("/update")
	@RequiresAuthentication
	@LogAnnotation(module = "文章管理", operation = "更新文章")
	public Result update(@RequestBody Article article) {
		articleAdminService.update(article);
		Result result = Result.success();
		result.simple().put("articleId", article.getId());
		return result;
	}
	
	@RequestMapping(value = "/delete")
	@RequiresAuthentication
	@LogAnnotation(module = "文章管理", operation = "删除文章")
	public Result delete(@RequestParam(name = "ids") Integer[] ids) {
		articleAdminService.remove(ids);
		return Result.success();
	}

	@RequestMapping(value = "/list")
	@RequiresAuthentication
	@FastJsonView(
			exclude = {
					@FastJsonFilter(clazz = Article.class, props = {"body", "comments"}),
                    @FastJsonFilter(clazz = Tag.class, props = {"id", "avatar"})
                    },
            include = {
            		@FastJsonFilter(clazz = User.class, props = {"nickname","id"})
            		})
	@LogAnnotation(module = "文章管理", operation = "查询文章")
	public Result list(ArticleVo articleVo, PageVo pageVo) {
		Page<Article> page = articleAdminService.page(articleVo, pageVo);
		return Result.success(page);
	}
}