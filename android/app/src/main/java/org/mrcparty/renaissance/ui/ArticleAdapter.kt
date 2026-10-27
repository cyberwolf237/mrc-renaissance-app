package org.mrcparty.renaissance.ui

import android.app.AlertDialog
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.model.Article

class ArticleAdapter(
    private var articles: List<Article>
) : RecyclerView.Adapter<ArticleAdapter.ArticleViewHolder>() {

    class ArticleViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val tvCategory: TextView = itemView.findViewById(R.id.tv_article_category)
        val tvDate: TextView = itemView.findViewById(R.id.tv_article_date)
        val tvTitle: TextView = itemView.findViewById(R.id.tv_article_title)
        val tvExcerpt: TextView = itemView.findViewById(R.id.tv_article_excerpt)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ArticleViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_article, parent, false)
        return ArticleViewHolder(view)
    }

    override fun onBindViewHolder(holder: ArticleViewHolder, position: Int) {
        val article = articles[position]
        holder.tvCategory.text = article.category.uppercase()
        holder.tvDate.text = article.date
        holder.tvTitle.text = article.title
        holder.tvExcerpt.text = article.excerpt

        holder.itemView.setOnClickListener {
            AlertDialog.Builder(holder.itemView.context)
                .setTitle(article.title)
                .setMessage("Date : ${article.date}\nPar : ${article.author}\n\n${article.content}\n\nConsultez l'article original sur : ${article.url}")
                .setPositiveButton("Fermer", null)
                .show()
        }
    }

    override fun getItemCount(): Int = articles.size

    fun updateList(newList: List<Article>) {
        articles = newList
        notifyDataSetChanged()
    }
}
